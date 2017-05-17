    
    ; script
start:
    ; attribution
        ; value real 3.7
        set r2 3700
        ; a: r3
        set r3 0
    store r3 r2
    ; asm
        ; a: r2
        set r2 0
        load r2 r2
    writenumber r2 
    stop