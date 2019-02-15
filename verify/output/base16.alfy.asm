start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 0
	load r2 r2
	push r2
	run base16
	set r2 4
	pushsp
	pop r3
	add r3 r3 r2
	push r3
	popsp
	mov r2 r1
	stop
base16:
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
	jg next_0
	set r5 0
next_0:
	set r3 1
	test r3 r5
	jne endif_0
	push r2
	push r5
	set r3 8
	add r3 r0 r3
	load r3 r3
	set r4 16
	div r6 r3 r4
	push r6
	run base16
	set r3 4
	pushsp
	pop r4
	add r4 r4 r3
	push r4
	popsp
	pop r5
	pop r2
	mov r3 r1
	set r3 8
	add r3 r0 r3
	load r3 r3
	set r4 16
	mod r6 r3 r4
	set r3 0
	store r3 r6
	set r3 0
	load r3 r3
	set r4 10
	test r3 r4
	set r6 1
	jge next_1
	set r6 0
next_1:
	set r3 1
	test r3 r6
	jne else_1
	set r3 0
	load r3 r3
	set r4 'a'
	add r7 r4 r3
	set r3 10
	sub r4 r7 r3
	write r4
	jmp endif_0
else_1:
	set r3 0
	load r3 r3
	set r4 '0'
	add r7 r4 r3
	write r7
endif_0:
endif_1:
	push r0
	popsp
	pop r0
	ret
