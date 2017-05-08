    
    ; script
start:
    ; attribution
        ; value int 6
        set r2 6
        ; element of array int: r3
            ; v: r4
            set r4 0
            ; element of struct structure: r5 element position
                ; s: r6
                set r6 36
            set r7 0
            add r5 r6 r7
            load r5 r5
        set r6 4
        mul r5 r5 r6
        add r3 r4 r5
    load r3 r2
    stop