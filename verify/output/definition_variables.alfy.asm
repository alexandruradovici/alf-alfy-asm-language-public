start:
	set r2 7
	push r2
	set r2 3
	push r2
	run sum
	set r2 4
	pushsp
	pop r3
	add r3 r3 r2
	push r3
	popsp
	mov r2 r1
	writenumber r2
	stop
sum:
	push r0
	pushsp
	pop r0
	set r2 0
	sub r2 r0 r2 
	push r2
	popsp
	set r3 8
	add r3 r0 r3
	load r3 r3
	set r4 12
	add r4 r0 r4
	load r4 r4
	add r5 r3 r4
	set r3 0
	store r3 r5
	set r3 0
	load r3 r3
	push r0
	popsp
	pop r0
	mov r1 r3
	ret
	push r0
	popsp
	pop r0
	ret
