require "./niffler/*"

# TODO: Write documentation for `Niffler`
module NifflerModule

  class Niffler

    getter root : String

    def initialize(@root = Dir.current)
    end

    def find(fragment : String)
      self.select &.includes? fragment
    end

    def find(fragment : Regex)
      self.select { |s| !fragment.match(s).nil? }
    end

    def select(&block : String -> Bool)
      arr = [] of String
      each { |e| arr << e if block.call(e) }
      arr
    end

    # Finds the first file
    def each(&block : String -> )
      walk do |t|
        root, dirs, files = t

        {dirs, files}.each do |col|
          (col.map { |bname| File.join(root, bname) }).each do |hit|
            block.call(hit)
          end
        end
      end
    end

    def walk(d = @root, &block : Tuple(String, Array(String), Array(String)) -> )
      d = Dir.new(d) if d.is_a?(String)
      dirs, files = d.entries.partition { |s| Dir.exists?(File.join(d.path, s)) }
      dirs = dirs.select { |x| !{".", ".."}.includes? x }
      if Dir.exists?(d.path)
        block.call({d.path, dirs, files})
        dirs.each do |dir_name|
          walk File.join(d.path, dir_name), &block
        end
      end
    end

  end

end

include NifflerModule
