require "./spec_helper"

describe "Niffler" do


  it "can we walk" do
    ary = [] of Tuple(String, Array(String), Array(String))
    Niffler.new.walk("spec/test_directory") do |t|
      ary << t
    end
    expected = [
      {"spec/test_directory", ["b"], ["a.txt"]},
      {"spec/test_directory/b", ["c"], ["b.txt"]},
      {"spec/test_directory/b/c", [] of String, ["c.json"]}
    ]
    ary.should eq(expected)
  end

  it "selection" do
    actual = Niffler.new("spec/test_directory").select {|x| !x.ends_with? ".txt" }
    expected = ["spec/test_directory/b", "spec/test_directory/b/c", "spec/test_directory/b/c/c.json"]
    actual.should eq(expected)
  end

  it "str find" do
    actual = Niffler.new("spec/test_directory").find ".txt"
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt"]
    actual.should eq(expected)
  end

  it "regex find" do
    actual = Niffler.new("spec/test_directory").find /txt/
    expected = ["spec/test_directory/a.txt", "spec/test_directory/b/b.txt"]
    actual.should eq(expected)
  end

end
