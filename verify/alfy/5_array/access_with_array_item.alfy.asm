    
    ; script
start:
    ; attribution
        ; value int 7
        set r2 7
        ; element of array int: r3
            ; v: r4
            set r4 0
            ; element of array int: r5
                ; p: r6
                set r6 36
                ; value int 5
                set r7 5
            set r8 4
            mul r7 r7 r8
            add r5 r6 r7
            load r5 r5
        set r6 4
        mul r5 r5 r6
        add r3 r4 r5
    load r3 r2
    stop