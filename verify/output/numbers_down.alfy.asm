start:
	set r2 6
	set r3 1
	set r4 1
	set r5 0
	mov r6 r2
	store r5 r6
for_0:
	test r6 r3
	jl endfor_0
	set r7 0
	load r7 r7
	writenumber r7
	sub r6 r6 r4
	store r5 r6
	jmp for_0
endfor_0:
	stop
