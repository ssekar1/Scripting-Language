require 'open-uri'

if ARGV.length != 2
    STDERR.puts "Usage: #$0 <source file> <destination file>"
    exit 1
end

File.open(ARGV[0], 'r') do |source|
    File.open(ARGV[1], 'w') do |dest|
        source.each { |line| dest.print line }
   mymatch =~ /(?<=#)[a-fA-F0-9]{6}|[a-fA-F0-9]{3}/
}
    end
end



match1 = mymatch.splice.i(2, 16)



def print_header
    puts <<-HEAD
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>Stylesheet Colors</title>
    <style>
      body {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #333;
      }
      h1 {
        font-size: 40px;
        font-weight: 300;
        margin: 36px 8px 8px 8px;
        color: #333;
      }
      h2 {
        margin: 0 8px 20px 8px;
        font-size: 18px;
        font-weight: 300;
      }
      h2 a {
        color: #999 !important;
        text-decoration: none;
      }
      h2 a:hover {
        text-decoration: underline;
      }
      .color { 
        height: 200px;
        width: 200px;
        float: left;
        margin: 10px;
        border: 1px solid #000; 
        position: relative;
        -webkit-box-shadow: 0 0 10px #eee; 
        -moz-box-shadow: 0 0 10px #eee; 
        box-shadow: 0 0 10px #eee; 
      }
      .color:hover {
        -webkit-box-shadow: 0 0 10px #666; 
        -moz-box-shadow: 0 0 10px #666; 
        box-shadow: 0 0 10px #666; 
      }
      .info { 
        background-color: #fff;
        background-color: rgba(255,255,255,.5);
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 5px;
        border-top: 1px solid #000;
        font-size: 12px;
        text-align: right;
      }
      .rgb {
        float: left;
      }
    </style>
  </head>
  <body>
    <h1>Stylesheet Colors</h1>
    <h2><a href="http://userpages.umbc.edu/~dhood2/courses/cmsc433/spring2013/Miscellaneous/ruby-css/cs433.css">http://userpages.umbc.edu/~dhood2/courses/cmsc433/spring2013/Miscellaneous/ruby-css/cs433.css</a></h2>
    HEAD
end



def middle
    puts<<-MIDDLE
<div class="color" style="background-color: $mymatch">
  <div class="info">
    <div class="rgb">
      RGB: $match1
    </div>
    <div class="hex">
      Hex: $mymatch
    </div>
    <!-- 1 occurrence(s) -->
  </div>
</div>

def print_footer
    puts <<-FOOT
 </body>
</html>
    FOOT
end
