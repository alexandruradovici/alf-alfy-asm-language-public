start:
	set r2 0
	set r3 4
	store r3 r2
	readnumber r2
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	set r3 0
	test r2 r3
	set r4 1
	je next_0
	set r4 0
next_0:
	set r2 1
	test r2 r4
	jne endif_0
	set r2 1
	set r3 4
	store r3 r2
endif_0:
while_0:
	set r2 0
	load r2 r2
	set r3 0
	test r2 r3
	set r5 1
	jne next_1
	set r5 0
next_1:
	set r2 1
	test r2 r5
	jne endwhile_0
	set r2 0
	load r2 r2
	set r3 10
	div r5 r2 r3
	set r2 0
	store r2 r5
	set r2 4
	load r2 r2
	set r3 1
	add r5 r2 r3
	set r2 4
	store r2 r5
	jmp while_0
endwhile_0:
	set r2 4
	load r2 r2
	writenumber r2
	stop
