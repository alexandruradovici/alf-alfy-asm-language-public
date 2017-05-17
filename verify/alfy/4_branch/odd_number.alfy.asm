    
    ; script
start:
    ; asm
    readnumber r2 
        ; a: r3
        set r3 0
    store r3 r2
    ; attribution
        ; value symbol o
        set r2 'o'
        ; e: r3
        set r3 4
    store r3 r2
    ; if
        ; expression =
            ; expression mod
                ; a: r4
                set r4 0
                load r4 r4
                ; value int 2
                set r5 2
            mod r3 r4 r5
            ; value int 1
            set r4 1
        test r3 r4
        set r2 1
        je next_0
        set r2 0
    next_0:
    set r3 1
    test r3 r2
    jne endif_0
        ; attribution
            ; value symbol e
            set r2 'e'
            ; e: r3
            set r3 4
        store r3 r2
endif_0:
    ; asm
        ; e: r2
        set r2 4
        load r2 r2
    write r2 
    stop