    
    ; script
start:
    ; asm
        ; expression AND
            ; expression >
                ; expression +
                    ; value int 2
                    set r5 2
                    ; value int 4
                    set r6 4
                add r4 r5 r6
                ; expression *
                    ; value int 5
                    set r6 5
                    ; value int 6
                    set r7 6
                mul r5 r6 r7
            test r4 r5
            set r3 1
            jg next_0
            set r3 0
        next_0:
            ; expression <
                ; expression +
                    ; value int 4
                    set r6 4
                    ; value int 5
                    set r7 5
                add r5 r6 r7
                ; expression /
                    ; value int 6
                    set r7 6
                    ; value int 7
                    set r8 7
                div r6 r7 r8
            test r5 r6
            set r4 1
            jl next_1
            set r4 0
        next_1:
        and r2 r3 r4
    writenumber r2 
    stop