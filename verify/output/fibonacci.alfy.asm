start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	push r2
	run fibonacci
	set r2 8
	pushsp
	pop r3
	add r3 r3 r2
	push r3
	popsp
	mov r2 r1
	writenumber r2
	pushsp
	pop r2
	set r3 4
	store r3 r2
	set r2 4
	load r2 r2
	writenumber r2
	stop
fibonacci:
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
	set r4 0
	test r3 r4
	set r5 1
	je next_0
	set r5 0
next_0:
	set r3 8
	add r3 r0 r3
	load r3 r3
	set r4 1
	test r3 r4
	set r6 1
	je next_1
	set r6 0
next_1:
	or r3 r5 r6
	set r4 1
	test r4 r3
	jne else_1
	set r4 1
	push r0
	popsp
	pop r0
	mov r1 r4
	ret
	jmp endif_0
else_1:
	push r2
	push r3
	set r4 8
	add r4 r0 r4
	load r4 r4
	set r5 2
	sub r6 r4 r5
	push r6
	run fibonacci
	set r4 8
	pushsp
	pop r5
	add r5 r5 r4
	push r5
	popsp
	pop r3
	pop r2
	mov r4 r1
	push r2
	push r3
	push r4
	set r5 8
	add r5 r0 r5
	load r5 r5
	set r6 1
	sub r7 r5 r6
	push r7
	run fibonacci
	set r5 8
	pushsp
	pop r6
	add r6 r6 r5
	push r6
	popsp
	pop r4
	pop r3
	pop r2
	mov r5 r1
	add r6 r4 r5
	push r0
	popsp
	pop r0
	mov r1 r6
	ret
endif_0:
	push r0
	popsp
	pop r0
	ret
