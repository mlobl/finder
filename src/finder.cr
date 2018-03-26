# Inspired by the find command, this helps you find files and folders
# recursively in Crystal
class Finder
  getter root : String

  def initialize(@root = Dir.current)
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

  # Iterates over each directory and file underneath the root
  def each(&block : String ->)
    walk do |root, dirs, files|
      {dirs, files}.each do |col|
        (col.map { |bname| File.join(root, bname) }).each do |hit|
          block.call(hit)
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
