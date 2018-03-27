require "./spec_helper"

describe "Finder" do
  it "can we walk" do
    ary = [] of Tuple(String, Array(String), Array(String))
    Finder.new.walk("spec/test_directory") do |a, b, c|
      ary << {a, b, c}
    end
    expected = [
      {"spec/test_directory", ["b"], ["a.txt"]},
      {"spec/test_directory/b", ["c"], ["b.txt"]},
      {"spec/test_directory/b/c", [] of String, ["c.json"]},
    ]
    ary.should eq(expected)
  end

  it "selection" do
    actual = Finder.new("spec/test_directory").select { |x| !x.ends_with? ".txt" }
    expected = ["spec/test_directory/b", "spec/test_directory/b/c", "spec/test_directory/b/c/c.json"]
    actual.should eq(expected)
  end

  it "str find" do
    actual = Finder.new("spec/test_directory").find ".txt"
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt"]
    actual.should eq(expected)
  end

  it "regex find" do
    actual = Finder.new("spec/test_directory").find /txt/
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt"]
    actual.should eq(expected)
  end

  it "dirs array test" do
    actual = Finder.new("spec/test_directory").dirs
    expected = ["spec/test_directory/b", "spec/test_directory/b/c"]
    actual.should eq(expected)
  end

  it "files array test" do
    actual = Finder.new("spec/test_directory").files
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt", "spec/test_directory/b/c/c.json"]
    actual.should eq(expected)
  end

  it "dirs block test" do
    actual = [] of String
    Finder.new("spec/test_directory").dirs do |e|
      actual << e
    end
    expected = ["spec/test_directory/b", "spec/test_directory/b/c"]
    actual.should eq(expected)
  end

  it "files block test" do
    actual = [] of String
    Finder.new("spec/test_directory").files do |e|
      actual << e
    end
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt", "spec/test_directory/b/c/c.json"]
    actual.should eq(expected)
  end

  it "using rules" do
    r = FinderRule.new(name: "a*")
    actual = Finder.new("spec/test_directory", r).files
    expected = ["spec/test_directory/a.txt"]
    actual.should eq(expected)
  end

  it "full path using rules" do
    r = FinderRule.new(name: "a*")
    actual = Finder.new(File.join(Dir.current, "spec/test_directory"), [r]).files
    expected = [File.join(Dir.current, "spec/test_directory/a.txt")]
    actual.should eq(expected)
  end

  it "files array test full paths with rules" do
    r = FinderRule.new(name: "a*")
    actual = Finder.new(File.join(Dir.current, "spec/test_directory"), r).files
    expected = ["spec/test_directory/a.txt"].map { |p| File.expand_path(p) }
    actual.should eq(expected)
  end
end
