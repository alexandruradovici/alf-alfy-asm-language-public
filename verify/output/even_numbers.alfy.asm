start:
	readnumber r2
	set r3 0
	store r3 r2
	set r2 2
	set r3 0
	load r3 r3
	set r4 1
	set r5 4
	mov r6 r2
	store r5 r6
for_0:
	test r6 r3
	jg endfor_0
	set r7 4
	load r7 r7
	set r8 2
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
	set r7 4
	load r7 r7
	writenumber r7
endif_0:
	add r6 r6 r4
	store r5 r6
	jmp for_0
endfor_0:
	stop
