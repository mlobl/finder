require "./spec_helper"

describe "FinderRule" do
  it "match name alone" do
    FinderRule.new(name: "hello*").match?("./hello.cr").should be_true
    FinderRule.new(name: "hello").match?("blah/hello.cr").should be_false
  end

  it "matches paths" do
    FinderRule.new(path: "**ah/hello**").match?("blah/hello.cr").should be_true
    FinderRule.new(path: "df/hello").match?("blah/hello.cr").should be_false
  end

  it "get_depth" do
    FinderRule.new.get_depth("blah/hello.cr").should eq(1)
    FinderRule.new.get_depth("a/b/c/hello.cr").should eq(3)
    FinderRule.new.get_depth("/a/b/c/hello.cr").should eq(3)
    FinderRule.new.get_depth("hello.cr").should eq(0)
  end

  it "max_depth" do
    FinderRule.new(max_depth: 0).match?("hello.cr").should be_true
    FinderRule.new(max_depth: 0).match?("a/hello.cr").should be_false
    FinderRule.new(max_depth: 2).match?("a/b/c/hello.cr").should be_false
    FinderRule.new(max_depth: 3).match?("a/b/c/hello.cr").should be_true
  end

  it "min_depth" do
    FinderRule.new(min_depth: 0).match?("hello.cr").should be_true
    FinderRule.new(min_depth: 1).match?("hello.cr").should be_false
    FinderRule.new(min_depth: 2).match?("a/b/c/hello.cr").should be_true
    FinderRule.new(min_depth: 4).match?("a/b/c/hello.cr").should be_false
  end

  it "AND" do
    a = FinderRule.new(min_depth: 0)
    b = FinderRule.new(min_depth: 1)
    (a & b).match?("a/hello.cr").should be_true
    (a & b).match?("hello.cr").should be_false
  end

  it "OR" do
    a = FinderRule.new(min_depth: 0)
    b = FinderRule.new(min_depth: 1)
    c = FinderRule.new(min_depth: 2)
    (a | b).match?("a/hello.cr").should be_true
    (a | b).match?("hello.cr").should be_true
    (b | c).match?("hello.cr").should be_false
  end
end
