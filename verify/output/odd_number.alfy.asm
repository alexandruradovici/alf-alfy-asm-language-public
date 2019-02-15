start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 'o'
	set r3 4
	store r3 r2
	set r2 0
	load r2 r2
	set r3 2
	mod r4 r2 r3
	set r2 1
	test r4 r2
	set r3 1
	je next_0
	set r3 0
next_0:
	set r2 1
	test r2 r3
	jne endif_0
	set r2 'e'
	set r4 4
	store r4 r2
endif_0:
	set r2 4
	load r2 r2
	write r2
	stop
