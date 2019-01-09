crystal_doc_search_index_callback({"repository_name":"github.com/mlobl/finder","body":"# finder\n\nHelps you find files and folders recursively from a root directory\n\n[![Build Status](https://travis-ci.org/mlobl/finder.svg?branch=master)](https://travis-ci.org/mlobl/finder)\n[![GitHub release](https://img.shields.io/github/release/mlobl/finder.svg)](https://github.com/mlobl/finder/releases)\n\n## Installation\n\nAdd this to your application's `shard.yml`:\n\n```yaml\ndependencies:\n  finder:\n    github: mlobl/finder\n```\n\n## Usage\nYou can look at spec and [docs](https://mlobl.github.io/finder/Finder.html) for a few examples, but here are some quickies\n```crystal\nrequire \"finder\"\n\n# Uses CWD as the root dir by default\nfinder = Finder.new\n# or set it like this\nFinder.new \"/tmp\"\n\n# substring match\nfinder.find(\".txt\")  # ==> [\"a.txt\", \"dir/path/b.txt\", ..]\n# or regex\nFinder.new.find(/\\.txt/)  # ==> [\"a.txt\", \"dir/path/b.txt\", ..]\n# filter with a select method\nfinder.select &.includes? \"substring\"\n# array of all files (can pass in block as well)\nFinder.new.files # ==> [\"dir_a/x.txt\", \"dir_b/y.txt\", ..]\n# same for dirs\nFinder.new.dirs # ==> [\"dir_a\", \"dir_b\", ..]\n# iterate across both dirs and files with each\nFinder.new.each do |path|\n    puts path\nend\n# walk the directory (port of Python's os.walk)\nFinder.new.walk do |current_dir, folder, files|\n    ....\nend\n\n# ---------------------\n# You can also create composable rules for which files to match on\nFinderRule.new(path: \"**ah/hello**\").match?(\"blah/hello.cr\").should be_true\n# name, path, max_depth, min_depth, and root are supported kwargs\n#(see docs/spec for more details) \na = FinderRule.new(min_depth: 0)\nb = FinderRule.new(min_depth: 1)\nc = FinderRule.new(min_depth: 2)\n(b & (a | c)).match?(\"a/hello.cr\").should be_true\n(c & (a | b)).match?(\"a/hello.cr\").should be_false\n# and an illustration with the Finder class\nFinder.new(b & (a | c))\n```\n\n\n## Contributing\n\n1. Fork it ( https://github.com/mlobl/finder/fork )\n2. Create your feature branch (git checkout -b my-new-feature)\n3. Commit your changes (git commit -am 'Add some feature')\n4. Push to the branch (git push origin my-new-feature)\n5. Create a new Pull Request\n\n## Contributors\n\n- [mlobl](https://github.com/mlobl) Meyer Lobl - creator, maintainer\n","program":{"html_id":"github.com/mlobl/finder/toplevel","path":"toplevel.html","kind":"module","full_name":"Top Level Namespace","name":"Top Level Namespace","abstract":false,"superclass":null,"ancestors":[],"locations":[],"repository_name":"github.com/mlobl/finder","program":true,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[],"instance_methods":[],"macros":[],"types":[{"html_id":"github.com/mlobl/finder/Finder","path":"Finder.html","kind":"class","full_name":"Finder","name":"Finder","abstract":false,"superclass":{"html_id":"github.com/mlobl/finder/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/mlobl/finder/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/mlobl/finder/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"finder.cr","line_number":57,"url":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr"}],"repository_name":"github.com/mlobl/finder","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":"Inspired by the find command, this helps you find files and folders\nrecursively in Crystal","summary":"<p>Inspired by the find command, this helps you find files and folders recursively in Crystal</p>","class_methods":[],"constructors":[{"id":"new(root:String,rules:Array(FinderRule))-class-method","html_id":"new(root:String,rules:Array(FinderRule))-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"root","doc":null,"default_value":"","external_name":"root","restriction":"String"},{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Array(FinderRule)"}],"args_string":"(root : String, rules : Array(FinderRule))","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L61","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L61","def":{"name":"new","args":[{"name":"root","doc":null,"default_value":"","external_name":"root","restriction":"String"},{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Array(FinderRule)"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(root, rules)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(root:String,rule:FinderRule)-class-method","html_id":"new(root:String,rule:FinderRule)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"root","doc":null,"default_value":"","external_name":"root","restriction":"String"},{"name":"rule","doc":null,"default_value":"","external_name":"rule","restriction":"FinderRule"}],"args_string":"(root : String, rule : FinderRule)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L66","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L66","def":{"name":"new","args":[{"name":"root","doc":null,"default_value":"","external_name":"root","restriction":"String"},{"name":"rule","doc":null,"default_value":"","external_name":"rule","restriction":"FinderRule"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(root, rule)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(rules:Array(FinderRule))-class-method","html_id":"new(rules:Array(FinderRule))-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Array(FinderRule)"}],"args_string":"(rules : Array(FinderRule))","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L75","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L75","def":{"name":"new","args":[{"name":"rules","doc":null,"default_value":"","external_name":"rules","restriction":"Array(FinderRule)"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(rules)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(rule:FinderRule)-class-method","html_id":"new(rule:FinderRule)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"rule","doc":null,"default_value":"","external_name":"rule","restriction":"FinderRule"}],"args_string":"(rule : FinderRule)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L80","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L80","def":{"name":"new","args":[{"name":"rule","doc":null,"default_value":"","external_name":"rule","restriction":"FinderRule"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(rule)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}},{"id":"new(root=Dir.current)-class-method","html_id":"new(root=Dir.current)-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[{"name":"root","doc":null,"default_value":"Dir.current","external_name":"root","restriction":""}],"args_string":"(root = <span class=\"t\">Dir</span>.current)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L71","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L71","def":{"name":"new","args":[{"name":"root","doc":null,"default_value":"Dir.current","external_name":"root","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(root)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"dirs:Array(String)-instance-method","html_id":"dirs:Array(String)-instance-method","name":"dirs","doc":"gives you all the directories that exist recursively as Array(String)","summary":"<p>gives you all the directories that exist recursively as Array(String)</p>","abstract":false,"args":[],"args_string":" : Array(String)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L96","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L96","def":{"name":"dirs","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"ary = [] of String\nwalk do |root, dirs, files|\n  ary = ary + (dirs.select do |e|\n    passes_rules(File.join(root, e))\n  end).map do |x|\n    File.join(root, x)\n  end\nend\nary\n"}},{"id":"dirs(&block:String->)-instance-method","html_id":"dirs(&amp;block:String-&gt;)-instance-method","name":"dirs","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"(&block : String -> )","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L104","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L104","def":{"name":"dirs","args":[],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(String -> )"},"return_type":"","visibility":"Public","body":"walk do |root, dirs, files|\n  dirs.each do |e|\n    path = File.join(root, e)\n    if passes_rules(path)\n      block.call(path)\n    end\n  end\nend"}},{"id":"each(&block:String->)-instance-method","html_id":"each(&amp;block:String-&gt;)-instance-method","name":"each","doc":"Iterates over each directory and file underneath the root that matches the\nFinderRules passed in or all of them if nothing was passed in.","summary":"<p>Iterates over each directory and file underneath the root that matches the FinderRules passed in or all of them if nothing was passed in.</p>","abstract":false,"args":[],"args_string":"(&block : String -> )","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L146","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L146","def":{"name":"each","args":[],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(String -> )"},"return_type":"","visibility":"Public","body":"walk do |root, dirs, files|\n  {dirs, files}.each do |col|\n    (col.map do |bname|\n      File.join(root, bname)\n    end).each do |f|\n      if passes_rules(f)\n        block.call(f)\n      end\n    end\n  end\nend"}},{"id":"files:Array(String)-instance-method","html_id":"files:Array(String)-instance-method","name":"files","doc":"gives you all the files that exist recursively as Array(String)","summary":"<p>gives you all the files that exist recursively as Array(String)</p>","abstract":false,"args":[],"args_string":" : Array(String)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L114","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L114","def":{"name":"files","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"ary = [] of String\nwalk do |root, dirs, files|\n  ary = ary + (files.select do |x|\n    passes_rules(File.join(root, x))\n  end).map do |x|\n    File.join(root, x)\n  end\nend\nary\n"}},{"id":"files(&block:String->)-instance-method","html_id":"files(&amp;block:String-&gt;)-instance-method","name":"files","doc":"allows you to iterate over the files with a block","summary":"<p>allows you to iterate over the files with a block</p>","abstract":false,"args":[],"args_string":"(&block : String -> )","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L123","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L123","def":{"name":"files","args":[],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(String -> )"},"return_type":"","visibility":"Public","body":"walk do |root, dirs, files|\n  files.each do |e|\n    path = File.join(root, e)\n    if passes_rules(path)\n      block.call(path)\n    end\n  end\nend"}},{"id":"find(fragment:String):Array(String)-instance-method","html_id":"find(fragment:String):Array(String)-instance-method","name":"find","doc":"Returns an array of paths recursively under root that include *fragment* in the path","summary":"<p>Returns an array of paths recursively under root that include <em>fragment</em> in the path</p>","abstract":false,"args":[{"name":"fragment","doc":null,"default_value":"","external_name":"fragment","restriction":"String"}],"args_string":"(fragment : String) : Array(String)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L86","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L86","def":{"name":"find","args":[{"name":"fragment","doc":null,"default_value":"","external_name":"fragment","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"self.select(&.includes?(fragment))"}},{"id":"find(fragment:Regex):Array(String)-instance-method","html_id":"find(fragment:Regex):Array(String)-instance-method","name":"find","doc":"Returns an array of paths recursively under root that match your regex *fragment*","summary":"<p>Returns an array of paths recursively under root that match your regex <em>fragment</em></p>","abstract":false,"args":[{"name":"fragment","doc":null,"default_value":"","external_name":"fragment","restriction":"Regex"}],"args_string":"(fragment : Regex) : Array(String)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L91","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L91","def":{"name":"find","args":[{"name":"fragment","doc":null,"default_value":"","external_name":"fragment","restriction":"Regex"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Array(String)","visibility":"Public","body":"self.select do |s|\n  !fragment.match(s).nil?\nend"}},{"id":"passes_rules(f)-instance-method","html_id":"passes_rules(f)-instance-method","name":"passes_rules","doc":null,"summary":null,"abstract":false,"args":[{"name":"f","doc":null,"default_value":"","external_name":"f","restriction":""}],"args_string":"(f)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L139","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L139","def":{"name":"passes_rules","args":[{"name":"f","doc":null,"default_value":"","external_name":"f","restriction":""}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"normalized = (f.lchop(@root)).lstrip(File::SEPARATOR)\n(@rules.map do |rule|\n  rule.match?(normalized)\nend).all?\n"}},{"id":"root:String-instance-method","html_id":"root:String-instance-method","name":"root","doc":null,"summary":null,"abstract":false,"args":[],"args_string":" : String","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L58","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L58","def":{"name":"root","args":[],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"String","visibility":"Public","body":"@root"}},{"id":"select(&block:String->Bool)-instance-method","html_id":"select(&amp;block:String-&gt;Bool)-instance-method","name":"select","doc":"Returns an array of paths recursively under root that are truthy for the block","summary":"<p>Returns an array of paths recursively under root that are truthy for the block</p>","abstract":false,"args":[],"args_string":"(&block : String -> Bool)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L133","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L133","def":{"name":"select","args":[],"double_splat":null,"splat_index":null,"yields":1,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(String -> Bool)"},"return_type":"","visibility":"Public","body":"arr = [] of String\neach do |e|\n  if block.call(e)\n    arr << e\n  end\nend\narr\n"}},{"id":"walk(d=@root,&block:String,Array(String),Array(String)->)-instance-method","html_id":"walk(d=@root,&amp;block:String,Array(String),Array(String)-&gt;)-instance-method","name":"walk","doc":"Port of Python's os.walk. It recursively iterates through\nthe root directory and at each level will give yield you the\ncurrent directory, array of directories in the current directory,\nand the same thing for files.","summary":"<p>Port of Python's os.walk.</p>","abstract":false,"args":[{"name":"d","doc":null,"default_value":"@root","external_name":"d","restriction":""}],"args_string":"(d = @root, &block : String, Array(String), Array(String) -> )","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L160","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L160","def":{"name":"walk","args":[{"name":"d","doc":null,"default_value":"@root","external_name":"d","restriction":""}],"double_splat":null,"splat_index":null,"yields":3,"block_arg":{"name":"block","doc":null,"default_value":"","external_name":"block","restriction":"(String, Array(String), Array(String) -> )"},"return_type":"","visibility":"Public","body":"if d.is_a?(String)\n  d = Dir.new(d)\nend\ndirs, files = d.children.partition do |s|\n  Dir.exists?(File.join(d.path, s))\nend\nblock.call(d.path, dirs, files)\ndirs.each do |dir_name|\n  walk(File.join(d.path, dir_name), &block)\nend\n"}}],"macros":[],"types":[]},{"html_id":"github.com/mlobl/finder/FinderRule","path":"FinderRule.html","kind":"class","full_name":"FinderRule","name":"FinderRule","abstract":false,"superclass":{"html_id":"github.com/mlobl/finder/Reference","kind":"class","full_name":"Reference","name":"Reference"},"ancestors":[{"html_id":"github.com/mlobl/finder/Reference","kind":"class","full_name":"Reference","name":"Reference"},{"html_id":"github.com/mlobl/finder/Object","kind":"class","full_name":"Object","name":"Object"}],"locations":[{"filename":"finder.cr","line_number":1,"url":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr"}],"repository_name":"github.com/mlobl/finder","program":false,"enum":false,"alias":false,"aliased":"","const":false,"constants":[{"id":"BLANK","name":"BLANK","value":"{'_', FinderRule.new, FinderRule.new}","doc":null,"summary":null},{"id":"DEFAULTS","name":"DEFAULTS","value":"{name: \"*\", path: \"**\", max_depth: 100000, min_depth: -1, expression: BLANK, root: Dir.current}","doc":null,"summary":null}],"included_modules":[],"extended_modules":[],"subclasses":[],"including_types":[],"namespace":null,"doc":null,"summary":null,"class_methods":[],"constructors":[{"id":"new-class-method","html_id":"new-class-method","name":"new","doc":null,"summary":null,"abstract":false,"args":[],"args_string":"","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L19","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L19","def":{"name":"new","args":[],"double_splat":{"name":"kwargs","doc":null,"default_value":"","external_name":"kwargs","restriction":""},"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"_ = allocate\n_.initialize(**kwargs)\nif _.responds_to?(:finalize)\n  ::GC.add_finalizer(_)\nend\n_\n"}}],"instance_methods":[{"id":"&(other:FinderRule)-instance-method","html_id":"&amp;(other:FinderRule)-instance-method","name":"&","doc":null,"summary":null,"abstract":false,"args":[{"name":"other","doc":null,"default_value":"","external_name":"other","restriction":"FinderRule"}],"args_string":"(other : FinderRule)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L46","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L46","def":{"name":"&","args":[{"name":"other","doc":null,"default_value":"","external_name":"other","restriction":"FinderRule"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"FinderRule.new(expression: {'&', self, other})"}},{"id":"get_depth(fpath:String)-instance-method","html_id":"get_depth(fpath:String)-instance-method","name":"get_depth","doc":null,"summary":null,"abstract":false,"args":[{"name":"fpath","doc":null,"default_value":"","external_name":"fpath","restriction":"String"}],"args_string":"(fpath : String)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L25","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L25","def":{"name":"get_depth","args":[{"name":"fpath","doc":null,"default_value":"","external_name":"fpath","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"path = fpath.strip(File::SEPARATOR)\npath.count(File::SEPARATOR)\n"}},{"id":"match?(fpath:String):Bool-instance-method","html_id":"match?(fpath:String):Bool-instance-method","name":"match?","doc":null,"summary":null,"abstract":false,"args":[{"name":"fpath","doc":null,"default_value":"","external_name":"fpath","restriction":"String"}],"args_string":"(fpath : String) : Bool","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L30","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L30","def":{"name":"match?","args":[{"name":"fpath","doc":null,"default_value":"","external_name":"fpath","restriction":"String"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"Bool","visibility":"Public","body":"results = [] of Bool\noperator, a, b = @conf[:expression]\ncase operator\nwhen '&'\n  (a.match?(fpath)) && (b.match?(fpath))\nwhen '|'\n  (a.match?(fpath)) || (b.match?(fpath))\nelse\n  results << (File.match?(@conf[:name], File.basename(fpath)))\n  results << (File.match?(@conf[:path], fpath))\n  results << (@conf[:min_depth] <= (__temp_23 = get_depth(fpath)) && __temp_23 <= @conf[:max_depth])\n  results.all?\nend\n"}},{"id":"|(other:FinderRule)-instance-method","html_id":"|(other:FinderRule)-instance-method","name":"|","doc":null,"summary":null,"abstract":false,"args":[{"name":"other","doc":null,"default_value":"","external_name":"other","restriction":"FinderRule"}],"args_string":"(other : FinderRule)","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L50","source_link":"https://github.com/mlobl/finder/blob/eb6a6b9f6704760bfe7365cab402d96c2efe0ea2/src/finder.cr#L50","def":{"name":"|","args":[{"name":"other","doc":null,"default_value":"","external_name":"other","restriction":"FinderRule"}],"double_splat":null,"splat_index":null,"yields":null,"block_arg":null,"return_type":"","visibility":"Public","body":"FinderRule.new(expression: {'|', self, other})"}}],"macros":[],"types":[]}]}})