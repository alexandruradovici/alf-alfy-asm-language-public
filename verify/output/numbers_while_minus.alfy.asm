start:
repeat_0:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	set r3 4
	set r4 1000
	mul r2 r2 r4
	store r3 r2
	set r2 4
	load r2 r2
	writenumber r2
	set r2 0
	load r2 r2
	set r3 0
	test r2 r3
	set r4 1
	jge next_0
	set r4 0
next_0:
	set r2 1
	test r2 r4
	je repeat_0
	stop
