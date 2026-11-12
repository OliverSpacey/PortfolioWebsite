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

    const ghost_disk = document.getElementById("ghost-floppy-disk")
    ghost_disk.style.display = "none"

    // Add scan lines and vignette
    // const scan_line_div = document.getElementById("scan-lines")
    // const vignette_div = document.getElementById("vignette")
    // scan_line_div.style.display = "block"
    // vignette_div.style.display = "block"

    document.getElementById("scan-lines").animate([
        {display: "block"}
    ], {
        delay: 500,
        duration: 1,
        fill: "forwards"
    });
    document.getElementById("vignette").animate([
        {display: "block"}
    ], {
        delay: 500,
        duration: 1,
        fill: "forwards"
    });


    // Animate colour change to match the disk
    // First go to black
    document.getElementById("page-background").animate([
        {backgroundColor: "#000"}
    ], {
        delay: 0,
        duration: 50,
        fill: "forwards"
    });
    // Then go to colour
    document.getElementById("page-background").animate([
        {backgroundColor: disk.style.backgroundColor}
    ], {
        delay: 500,
        duration: 150,
        fill: "forwards"
    });


    // Create a clone of the disk to place in the slot
    const disk_clone = disk.cloneNode(true)
    disk_clone.style.display = "flex"
    disk_clone.style.margin = "0"
    disk_clone.style.animation = "insertDisk 1s forwards"
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
        // Remove scan lines and vignette
        // const scan_line_div = document.getElementById("scan-lines")
        // const vignette_div = document.getElementById("vignette")
        // scan_line_div.style.display = "none"
        // vignette_div.style.display = "none"
        document.getElementById("scan-lines").animate([
            {display: "none"}
        ], {
            delay: 0,
            duration: 50,
            fill: "forwards"
        });
        document.getElementById("vignette").animate([
            {display: "none"}
        ], {
            delay: 0,
            duration: 50,
            fill: "forwards"
        });

        // Reset colour, and make all visible again
        document.getElementById("page-background").animate([
            {backgroundColor: "#000"}
        ], {
            delay: 0,
            duration: 50,
            fill: "forwards"
        });

        current_active.style.backgroundImage = current_active_colour
        current_active.getElementsByClassName("top-decoration")[0].style.display = "block"
        current_active.getElementsByClassName("content-area")[0].style.display = "block"

        // Clear current active
        current_active = null

        // Remove the cloned disk from the slot
        const active_slot = document.getElementById("active-disk-slot")
        const disk_clone = active_slot.getElementsByClassName("floppy-disk")[0]
        active_slot.removeChild(disk_clone)
        
        const ghost_disk = document.getElementById("ghost-floppy-disk")
        ghost_disk.style.display = "flex"
    }
}

addListeners()