start:
	set r2 0
	set r3 8
	store r3 r2
while_0:
	set r2 8
	load r2 r2
	set r3 0x0000000000000001
	xor r2 r2 r3
	set r3 1
	test r3 r2
	jne endwhile_0
	readnumber r3
	set r4 0
	store r4 r3
	set r3 1
	set r4 4
	store r4 r3
	set r3 2
	set r4 0
	load r4 r4
	set r5 2
	div r6 r4 r5
	set r4 1
	set r5 12
	mov r6 r3
	store r5 r6
for_0:
	test r6 r6
	jg endfor_0
	set r7 0
	load r7 r7
	set r8 12
	load r8 r8
	mod r9 r7 r8
	set r7 0
	test r9 r7
	set r8 1
	je next_0
	set r8 0
next_0:
	set r7 1
	test r7 r8
	jne endif_0
	set r7 0
	set r9 4
	store r9 r7
endif_0:
	add r6 r6 r4
	store r5 r6
	jmp for_0
endfor_0:
	set r7 4
	load r7 r7
	set r9 0x0000000000000001
	xor r7 r7 r9
	set r9 1
	test r9 r7
	jne endif_1
	set r9 0
	load r9 r9
	writenumber r9
endif_1:
	set r9 4
	load r9 r9
	set r10 8
	store r10 r9
	jmp while_0
endwhile_0:
	stop
