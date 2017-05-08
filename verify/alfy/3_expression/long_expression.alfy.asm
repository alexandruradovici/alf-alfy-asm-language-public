    
    ; script
start:
    ; asm
        ; expression AND
            ; expression >
                ; expression /
                    ; expression *
                        ; expression +
                            ; value int 2
                            set r7 2
                            ; value int 3
                            set r8 3
                        add r6 r7 r8
                        ; value int 7
                        set r7 7
                    mul r5 r6 r7
                    ; value int 8
                    set r6 8
                div r4 r5 r6
                ; value int 10
                set r5 10
            test r4 r5
            set r3 1
            jg next_0
            set r3 0
        next_0:
            ; expression XOR
                ; expression <
                    ; expression +
                        ; value int 7
                        set r7 7
                        ; value int 5
                        set r8 5
                    add r6 r7 r8
                    ; value int 5
                    set r7 5
                test r6 r7
                set r5 1
                jl next_1
                set r5 0
            next_1:
                ; expression !=
                    ; value int 7
                    set r7 7
                    ; n: r8
                    set r8 0
                    load r8 r8
                test r7 r8
                set r6 1
                jne next_2
                set r6 0
            next_2:
            xor r4 r5 r6
        and r2 r3 r4
    writenumber r2 
    stop