var current_active = null
var current_active_colour = null
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
    // Get rid of the active disk, if any
    removeActiveDisk()

    // Set new active
    current_active = disk
    current_active_colour = disk.style.backgroundImage

    // Create a clone of the disk to place in the slot
    const disk_clone = disk.cloneNode(true)
    disk_clone.style.display = "flex"
    disk_clone.style.margin = "0"
    disk_clone.style.transform = "translate(3.5%, -50%)"
    active_slot.appendChild(disk_clone)

    // Hide elements and make it translucent black
    disk.getElementsByClassName("top-decoration")[0].style.display = "none"
    disk.getElementsByClassName("content-area")[0].style.display = "none"
    disk.style.backgroundImage = "linear-gradient(rgba(0, 0, 0, 0.334))"
}

function diskHoverEntered(disk) {
    // console.log("Highlight")
}

function diskHoverExited(disk) {
    // console.log("Unhighlight")
}

function removeActiveDisk() {
    if (current_active) {
        // Reset colour, and make all visible again
        current_active.style.backgroundImage = current_active_colour
        current_active.getElementsByClassName("top-decoration")[0].style.display = "block"
        current_active.getElementsByClassName("content-area")[0].style.display = "block"

        // Clear current active
        current_active = null

        // Remove the cloned disk from the slot
        const active_slot = document.getElementById("active-disk-slot")
        const disk_clone = active_slot.getElementsByClassName("floppy-disk")[0]
        active_slot.removeChild(disk_clone)
    }
}

addListeners()