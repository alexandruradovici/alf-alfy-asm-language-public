    
    ; script
start:
    ; attribution
        ; value symbol s
        set r2 's'
        ; c: r3
        set r3 0
    store r3 r2
    ; attribution
        ; expression +
            ; c: r3
            set r3 0
            load r3 r3
            ; value int 6
            set r4 6
            ; typecast int symbol
        add r2 r3 r4
        ; c: r3
        set r3 0
    ; typecast symbol int
    set r5 0x00000000000000FF
    and r4 r2 r5
    store r3 r4
    ; asm
        ; c: r2
        set r2 0
        load r2 r2
    write r2 
    stop