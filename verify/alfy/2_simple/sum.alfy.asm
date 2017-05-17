    
    ; script
start:
    ; asm
    readnumber r2 
        ; x: r3
        set r3 0
    store r3 r2
    ; asm
    readnumber r2 
        ; y: r3
        set r3 4
    store r3 r2
    ; attribution
        ; expression +
            ; x: r3
            set r3 0
            load r3 r3
            ; y: r4
            set r4 4
            load r4 r4
        add r2 r3 r4
        ; s: r3
        set r3 8
    store r3 r2
    ; asm
        ; s: r2
        set r2 8
        load r2 r2
    writenumber r2 
    stop