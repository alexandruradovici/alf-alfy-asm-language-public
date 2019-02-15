start:
	set r2 3
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	set r3 4
	add r4 r2 r3
	writenumber r4
	stop
