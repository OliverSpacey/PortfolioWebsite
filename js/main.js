var current_active = null;
var current_active_colour = null;
var visible_div = null;

const animation_delay_open_ms = 500;
const animation_delay_close_ms = 0;

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
    if (disk == current_active) return;

    // Get rid of the active disk, if any
    removeActiveDisk()

    //Hide default text and display actual info
    document.getElementById("default").animate([
        {display: "none"}
    ], {
        delay: animation_delay_close_ms,
        duration: 1,
        fill: "forwards"
    });

    //Show content div
    document.getElementsByClassName("content")[0].animate([
        {display: "block"}
    ], {
        delay: animation_delay_open_ms,
        fill: "forwards"
    })

    const disk_id = disk.dataset.infoId;
    if (disk_id) {
        const info_div = document.getElementById(disk.dataset.infoId)
        if (info_div) {
            // Change to animation?
            info_div.animate([
                {display: "block"}
            ], {
                delay: animation_delay_open_ms,
                duration: 1,
                fill: "forwards"
            });
            visible_div = info_div
        }
    }

    // Set new active
    current_active = disk
    current_active_colour = disk.style.backgroundImage

    const ghost_disk = document.getElementById("ghost-floppy-disk")
    ghost_disk.style.display = "none"


    document.getElementById("disk-removal-tip").animate([
        {display: "flex"}
    ],{
        delay: animation_delay_open_ms,
        duration: 1,
        fill: "forwards"
    })

    // Add scan lines and vignette
    document.getElementById("scan-lines").animate([
        {display: "block"}
    ], {
        delay: animation_delay_open_ms,
        duration: 1,
        fill: "forwards"
    });
    document.getElementById("vignette").animate([
        {display: "block"}
    ], {
        delay: animation_delay_open_ms,
        duration: 1,
        fill: "forwards"
    });


    // Animate colour change to match the disk
    // First go to black
    document.getElementById("page-background").animate([
        {backgroundColor: "#000"}
    ], {
        delay: animation_delay_close_ms,
        duration: 50,
        fill: "forwards"
    });
    // Then go to colour
    document.getElementById("page-background").animate([
        {backgroundColor: disk.style.backgroundColor}
    ], {
        delay: animation_delay_open_ms,
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

        //Hide content
        document.getElementsByClassName("content")[0].animate([
            {display: "none"}
        ], {
            delay: animation_delay_close_ms,
            fill: "forwards"
        })

        //Show the default info div instantly
        document.getElementById("default").animate([
            {display: "flex"}
        ], {
            delay: animation_delay_close_ms,
            duration: 1,
            fill: "forwards"
        });

        // Hide info div
        if (visible_div) {
            visible_div.animate([
                {display: "none"}
            ], {
                delay: animation_delay_close_ms,
                duration: 1,
                fill: "forwards"
            });
        }

        // Hide disk removal tip div
        document.getElementById("disk-removal-tip").animate([
            {display: "none"}
        ],{
            delay: animation_delay_close_ms,
            duration: 1,
            fill: "forwards"
        })

        // Remove scan lines and vignette
        document.getElementById("scan-lines").animate([
            {display: "none"}
        ], {
            delay: animation_delay_close_ms,
            duration: 50,
            fill: "forwards"
        });
        document.getElementById("vignette").animate([
            {display: "none"}
        ], {
            delay: animation_delay_close_ms,
            duration: 50,
            fill: "forwards"
        });

        // Reset colour, and make all visible again
        document.getElementById("page-background").animate([
            {backgroundColor: "#000"}
        ], {
            delay: animation_delay_close_ms,
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