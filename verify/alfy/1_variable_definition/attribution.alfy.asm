    
    ; script
start:
    ; attribution
        ; value int 6
        set r2 6
        ; n: r3
        set r3 0
    store r3 r2
    ; asm
        ; n: r2
        set r2 0
        load r2 r2
    writenumber r2 
    stop