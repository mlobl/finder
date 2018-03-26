class FinderRule
  @expression : Tuple(Char, FinderRule, FinderRule)
  BLANK = {'_', FinderRule.new, FinderRule.new}

  def initialize(@name = "*", @path = "**", @max_depth = 100000, @min_depth = -1,
                 @expression = BLANK, root = Dir.current)
    @root = File.expand_path(root)
  end

  def get_depth(fpath : String)
    path = fpath.sub(@root, "").strip(File::SEPARATOR)
    path.count(File::SEPARATOR)
  end

  def match?(fpath : String) : Bool
    results = [] of Bool
    operator, a, b = @expression
    case operator
    when '&'
      a.match?(fpath) && b.match?(fpath)
    when '|'
      a.match?(fpath) || b.match?(fpath)
    else
      fpath_exp = File.expand_path(fpath)
      results << File.match?(@name, File.basename(fpath_exp))
      results << File.match?(@path, fpath_exp)
      results << (@min_depth <= get_depth(fpath_exp) <= @max_depth)
      results.all?
    end
  end

  def &(other : FinderRule)
    FinderRule.new(expression: {'&', self, other})
  end

  def |(other : FinderRule)
    FinderRule.new(expression: {'|', self, other})
  end
end

# Inspired by the find command, this helps you find files and folders
# recursively in Crystal
class Finder
  getter root : String
  @rules : Array(FinderRule)

  def initialize(@root = Dir.current, rules = [] of FinderRule)
    @rules = rules
  end

  # Returns an array of paths recursively under root that include *fragment* in the path
  def find(fragment : String) : Array(String)
    self.select &.includes? fragment
  end

  # Returns an array of paths recursively under root that match your regex *fragment*
  def find(fragment : Regex) : Array(String)
    self.select { |s| !fragment.match(s).nil? }
  end

  # gives you all the directories that exist recursively as Array(String)
  def dirs : Array(String)
    ary = [] of String
    walk do |root, dirs, files|
      ary += dirs.map { |x| File.join(@root, x) }
    end
    ary
  end

  def dirs(&block : String ->)
    walk do |root, dirs, files|
      dirs.each do |e|
        block.call(File.join(@root, e))
      end
    end
  end

  # gives you all the files that exist recursively as Array(String)
  def files : Array(String)
    ary = [] of String
    walk do |root, dirs, files|
      ary += files.map { |x| File.join(@root, x) }
    end
    ary
  end

  # allows you to iterate over the files with a block
  def files(&block : String ->)
    walk do |root, dirs, files|
      files.each do |e|
        block.call(File.join(@root, e))
      end
    end
  end

  # Returns an array of paths recursively under root that are truthy for the block
  def select(&block : String -> Bool)
    arr = [] of String
    each { |e| arr << e if block.call(e) }
    arr
  end

  # Iterates over each directory and file underneath the root that matches the
  # FinderRules passed in or all of them if nothing was passed in.
  def each(&block : String ->)
    walk do |root, dirs, files|
      {dirs, files}.each do |col|
        (col.map { |bname| File.join(root, bname) }).each do |f|
          passed = (@rules.map { |rule| rule.match? File.join(root, f) }).all?
          block.call(f) if passed
        end
      end
    end
  end

  # Port of Python's os.walk. It recursively iterates through
  # the root directory and at each level will give yield you the
  # current directory, array of directories in the current directory,
  # and the same thing for files.
  def walk(d = @root, &block : String, Array(String), Array(String) ->)
    d = Dir.new(d) if d.is_a?(String)
    dirs, files = d.children.partition { |s| Dir.exists?(File.join(d.path, s)) }
    block.call(d.path, dirs, files)
    dirs.each do |dir_name|
      walk File.join(d.path, dir_name), &block
    end
  end
end
