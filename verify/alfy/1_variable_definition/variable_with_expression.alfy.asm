    
    ; script
start:
    ; attribution
        ; expression +
            ; value int 20
            set r3 20
            ; expression *
                ; value int 3
                set r5 3
                ; value int 5
                set r6 5
            mul r4 r5 r6
        add r2 r3 r4
        ; e: r3
        set r3 0
    load r3 r2
    stop