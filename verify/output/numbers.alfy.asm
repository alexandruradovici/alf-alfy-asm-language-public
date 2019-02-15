start:
	readnumber r2
	set r3 0
	store r3 r2
	readnumber r2
	set r3 4
	store r3 r2
	readnumber r2
	set r3 8
	store r3 r2
	set r2 0
	load r2 r2
	set r3 4
	load r3 r3
	test r2 r3
	set r4 1
	jl next_0
	set r4 0
next_0:
	set r2 1
	test r2 r4
	jne else_0
	set r2 0
	load r2 r2
	set r3 4
	load r3 r3
	set r5 8
	load r5 r5
	set r6 12
	mov r7 r2
	store r6 r7
for_0:
	test r7 r3
	jg endfor_0
	set r8 12
	load r8 r8
	writenumber r8
	add r7 r7 r5
	store r6 r7
	jmp for_0
endfor_0:
	jmp endif_0
else_0:
	set r8 0
	load r8 r8
	set r9 4
	load r9 r9
	set r10 8
	load r10 r10
	set r11 12
	mov r12 r8
	store r11 r12
for_1:
	test r12 r9
	jl endfor_1
	set r13 12
	load r13 r13
	writenumber r13
	sub r12 r12 r10
	store r11 r12
	jmp for_1
endfor_1:
endif_0:
	stop
