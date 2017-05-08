    
    ; script
start:
    stop
    
    ; function say
say:
    ; Base pointer
    push r0
    pushsp
    pop r0
    ; Make space for variables
    set r3 0
    sub r2 r0 r3
    push r2
    popsp
    ; function
    ; Restore base pointer
    push r0
    popsp
    pop r0
    ; return
    ret