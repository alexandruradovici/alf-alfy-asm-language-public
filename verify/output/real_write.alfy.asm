start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 undefined
	load r2 r2
	push r2
	run real_write
	set r2 4
	pushsp
	pop r3
	add r3 r3 r2
	push r3
	popsp
	mov r2 r1
	stop
real_write:
	push r0
	pushsp
	pop r0
	set r2 4
	sub r2 r0 r2 
	push r2
	popsp
	set r3 12
	load r3 r3
	set r4 0
	store r4 r3
	pop r3
	set r4 4
	store r4 r3
	set r3 4
	load r3 r3
	set r4 1000
	mod r5 r3 r4
	set r3 4
	store r3 r5
	set r3 0
	load r3 r3
	writenumber r3
	write undefined
	set r3 4
	load r3 r3
	writenumber r3
	push r0
	popsp
	pop r0
	ret
