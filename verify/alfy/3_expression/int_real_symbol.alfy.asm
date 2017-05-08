    
    ; script
start:
    ; asm
        ; expression +
            ; expression +
                ; value int 2
                set r4 2
                ; value real 3.5
                set r5 3500
                ; typecast real int
                set r7 1000
                mul r6 r4 r7
            add r3 r6 r5
            ; value symbol e
            set r4 'e'
            ; typecast real symbol
            set r6 1000
            mul r5 r4 r6
        add r2 r3 r5
    writenumber r2 
    stop