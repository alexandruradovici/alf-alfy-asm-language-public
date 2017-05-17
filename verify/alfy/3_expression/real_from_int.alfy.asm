    
    ; script
start:
    ; asm
    readnumber r2 
        ; n: r3
        set r3 4
    store r3 r2
    ; attribution
        ; n: r2
        set r2 4
        load r2 r2
        ; s: r3
        set r3 0
    ; typecast real int
    set r5 1000
    mul r4 r2 r5
    store r3 r4
    ; asm
        ; s: r2
        set r2 0
        load r2 r2
    writenumber r2 
    stop