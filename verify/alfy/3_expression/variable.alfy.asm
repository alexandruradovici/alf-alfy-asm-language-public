    
    ; script
start:
    ; attribution
        ; value int 3
        set r2 3
        ; n: r3
        set r3 0
    store r3 r2
    ; asm
        ; expression +
            ; n: r3
            set r3 0
            load r3 r3
            ; value int 4
            set r4 4
        add r2 r3 r4
    writenumber r2 
    stop