start:
	readnumber r2
	set r3 4
	store r3 r2
	set r2 4
	load r2 r2
	set r3 0
	set r4 1000
	mul r2 r2 r4
	store r3 r2
	set r2 0
	load r2 r2
	writenumber r2
	stop
