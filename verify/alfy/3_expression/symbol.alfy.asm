    
    ; script
start:
    ; asm
        ; expression +
            ; value int 2
            set r3 2
            ; value symbol s
            set r4 's'
            ; typecast int symbol
        add r2 r3 r4
    write r2 
    stop