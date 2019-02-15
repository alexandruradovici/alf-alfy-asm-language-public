start:
	set r2 3
	set r3 5
	mul r4 r2 r3
	set r2 20
	add r3 r2 r4
	set r2 0
	store r2 r3
	set r2 0
	load r2 r2
	writenumber r2
	stop
