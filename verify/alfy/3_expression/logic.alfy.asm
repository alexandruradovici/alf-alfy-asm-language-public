    
    ; script
start:
    ; asm
        ; expression =
            ; expression +
                ; value int 2
                set r4 2
                ; value int 3
                set r5 3
            add r3 r4 r5
            ; expression +
                ; value int 4
                set r5 4
                ; value int 5
                set r6 5
            add r4 r5 r6
        test r3 r4
        set r2 1
        je next_0
        set r2 0
    next_0:
    writenumber r2 
    stop