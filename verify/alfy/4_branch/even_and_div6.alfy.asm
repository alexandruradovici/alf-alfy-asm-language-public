    
    ; script
start:
    ; asm
    readnumber r2 
        ; a: r3
        set r3 0
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
            ; value int 0
            set r4 0
        test r3 r4
        set r2 1
        je next_0
        set r2 0
    next_0:
    set r3 1
    test r3 r2
    jne else_0
        ; if
            ; expression =
                ; expression mod
                    ; a: r4
                    set r4 0
                    load r4 r4
                    ; value int 6
                    set r5 6
                mod r3 r4 r5
                ; value int 0
                set r4 0
            test r3 r4
            set r2 1
            je next_1
            set r2 0
        next_1:
        set r3 1
        test r3 r2
        jne else_1
            ; attribution
                ; value symbol y
                set r2 'y'
                ; e: r3
                set r3 4
            store r3 r2
        jmp endif_1
    else_1:
            ; attribution
                ; value symbol n
                set r2 'n'
                ; e: r3
                set r3 4
            store r3 r2
    endif_1:
    jmp endif_0
else_0:
        ; attribution
            ; value symbol o
            set r2 'o'
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