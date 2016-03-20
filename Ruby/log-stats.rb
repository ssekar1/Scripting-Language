require 'getoptlong'

String pattern = "^([\\d.]+) (\\S+) (\\S+) \\[([\\w:/]+\\s[+\\-]\\d{4})\\] \"(.+?)\" (\\d{3}) (\\d+) \"([^\"]+)\" \"([^\"]+)\"";
create GetoptLong object that take following arguments
opts = GetoptLong.new(
# no argument to flag
[ '--help', GetoptLong::NO_ARGUMENT ],
[ '--resources', GetoptLong::NO_ARGUMENT ],
[ '--requesters', '-req', GetoptLong::NO_ARGUMENT ],
[ '--errors', '-e', GetoptLong::NO_ARGUMENT ],
[ '--hourly', '-h', GetoptLong::NO_ARGUMENT ],
[ '--numbers', '-n', GetoptLong::REQUIRED_ARGUMENT ],
)
# leave yelling at the user up to us
opts.quiet = true
# attempt to parse each argument
 begin
opts.each do |opt, arg|
	case opt
	when '--help'
	puts "--resources"
	puts "--requesters"
        puts "--errors"
        puts "--hourly"
	when '--resources'
             puts " "
        when '--requesters'
             print " "
             puts  ""
when '--errors'
                puts " "
 	    when '--hourly'
                puts " "
        end
    end














