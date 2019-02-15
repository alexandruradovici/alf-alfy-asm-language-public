start:
	set r2 2
	set r3 3
	add r4 r2 r3
	set r2 4
	set r3 5
	add r5 r2 r3
	test r4 r5
	set r2 1
	je next_0
	set r2 0
next_0:
	writenumber r2
	stop
