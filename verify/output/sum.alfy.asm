start:
	readnumber r2
	set r3 0
	store r3 r2
	readnumber r2
	set r3 4
	store r3 r2
	set r2 0
	load r2 r2
	set r3 4
	load r3 r3
	add r4 r2 r3
	set r2 8
	store r2 r4
	set r2 8
	load r2 r2
	writenumber r2
	stop
