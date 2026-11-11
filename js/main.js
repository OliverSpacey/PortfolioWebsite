var current_active = null
// Listen for mouse events on the floppy disks - if selected, display relevant content
function addListeners() {
    const disks = document.getElementsByClassName("floppy-disk")
    const active_slot = document.getElementById("active-disk-slot")


    for (let disk of disks) {
        disk.addEventListener("click", function() {
            selectDisk(disk, active_slot)
        })
        disk.addEventListener("mouseenter", function() {
            diskHoverEntered(disk)
        })
        disk.addEventListener("mouseleave", function() {
            diskHoverExited(disk)
        })
    };

    active_slot.addEventListener("click", function() {
        removeActiveDisk()
    })

}

function selectDisk(disk, active_slot) {
    console.log(disk)
    // Change to hide in the selection area, then display this in the slot
    disk.style.display = "none"
    removeActiveDisk()
    current_active = disk
    const disk_clone = disk.cloneNode(true)
    disk_clone.style.display = "flex"
    active_slot.appendChild(disk_clone)
}

function diskHoverEntered(disk) {
    console.log("Highlight")
}

function diskHoverExited(disk) {
    console.log("Unhighlight")
}

function removeActiveDisk() {
    if (current_active) {
        current_active.style.display = "flex"
        current_active = null
        const active_slot = document.getElementById("active-disk-slot")
        const disk_clone = active_slot.getElementsByClassName("floppy-disk")[0]
        active_slot.removeChild(disk_clone)
    }
}

addListeners()