start:
	set r2 2
	set r3 4
	add r4 r2 r3
	set r2 5
	set r3 6
	mul r5 r2 r3
	test r4 r5
	set r2 1
	jg next_0
	set r2 0
next_0:
	set r3 4
	set r4 5
	add r5 r3 r4
	set r3 6
	set r4 7
	div r6 r3 r4
	test r5 r6
	set r3 1
	jl next_1
	set r3 0
next_1:
	and r4 r2 r3
	writenumber r4
	stop
