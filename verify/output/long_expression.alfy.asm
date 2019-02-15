start:
	set r2 2
	set r3 3
	add r4 r2 r3
	set r2 7
	mul r3 r4 r2
	set r2 8
	div r4 r3 r2
	set r2 10
	test r4 r2
	set r3 1
	jg next_0
	set r3 0
next_0:
	set r2 7
	set r4 5
	add r5 r2 r4
	set r2 5
	test r5 r2
	set r4 1
	jl next_1
	set r4 0
next_1:
	set r2 0
	load r2 r2
	set r5 7
	test r5 r2
	set r6 1
	jne next_2
	set r6 0
next_2:
	xor r2 r4 r6
	and r4 r3 r2
	writenumber r4
	stop
