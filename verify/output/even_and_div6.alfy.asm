start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	set r3 2
	mod r4 r2 r3
	set r2 0
	test r4 r2
	set r3 1
	je next_0
	set r3 0
next_0:
	set r2 1
	test r2 r3
	jne else_0
	set r2 0
	load r2 r2
	set r4 6
	mod r5 r2 r4
	set r2 0
	test r5 r2
	set r4 1
	je next_1
	set r4 0
next_1:
	set r2 1
	test r2 r4
	jne else_1
	set r2 'y'
	set r5 4
	store r5 r2
	jmp endif_0
else_1:
	set r2 'n'
	set r5 4
	store r5 r2
endif_0:
	jmp endif_1
else_0:
	set r2 'o'
	set r5 4
	store r5 r2
endif_1:
	set r2 4
	load r2 r2
	write r2
	stop
