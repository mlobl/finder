# finder

Helps you find files and folders recursively from a root directory

[![Build Status](https://travis-ci.org/mlobl/finder.svg?branch=master)](https://travis-ci.org/mlobl/finder)
[![GitHub release](https://img.shields.io/github/release/mlobl/finder.svg)](https://github.com/mlobl/finder/releases)

## Installation

Add this to your application's `shard.yml`:

```yaml
dependencies:
  finder:
    github: mlobl/finder
```

## Usage
You can look at spec and [docs](https://mlobl.github.io/finder/Finder.html) for a few examples, but here are some quickies
```crystal
require "finder"

# Uses CWD as the root dir by default
finder = Finder.new
# or set it like this
Finder.new "/tmp"

# substring match
finder.find(".txt")  # ==> ["a.txt", "dir/path/b.txt", ..]
# or regex
Finder.new.find(/\.txt/)  # ==> ["a.txt", "dir/path/b.txt", ..]
# filter with a select method
finder.select &.includes? "substring"
# array of all files (can pass in block as well)
Finder.new.files # ==> ["dir_a/x.txt", "dir_b/y.txt", ..]
# same for dirs
Finder.new.dirs # ==> ["dir_a", "dir_b", ..]
# iterate across both dirs and files with each
Finder.new.each do |path|
    puts path
end
# walk the directory (port of Python's os.walk)
Finder.new.walk do |current_dir, folder, files|
    ....
end

# ---------------------
# You can also create composable rules for which files to match on
FinderRule.new(path: "**ah/hello**").match?("blah/hello.cr").should be_true
# name, path, max_depth, min_depth, and root are supported kwargs
#(see docs/spec for more details) 
a = FinderRule.new(min_depth: 0)
b = FinderRule.new(min_depth: 1)
c = FinderRule.new(min_depth: 2)
(b & (a | c)).match?("a/hello.cr").should be_true
(c & (a | b)).match?("a/hello.cr").should be_false
# and an illustration with the Finder class
Finder.new(b & (a | c))
```


## Contributing

1. Fork it ( https://github.com/mlobl/finder/fork )
2. Create your feature branch (git checkout -b my-new-feature)
3. Commit your changes (git commit -am 'Add some feature')
4. Push to the branch (git push origin my-new-feature)
5. Create a new Pull Request

## Contributors

- [mlobl](https://github.com/mlobl) Meyer Lobl - creator, maintainer
