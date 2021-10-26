const Cycle = require("../../models/periodTracker.model");

const notesCycleTrackerControllers = {
    displayNotes: async (req, res) => {
      let user = req.user.id;
  
      const date = req.headers["dates"];
      const eventDate = new Date(date);
      const notesdata = [];
      await Cycle.findOne({ user })
        .then((response) => {
          for (i = 0; i < response.notes.length; i++) {
            const strDate = String(eventDate);
            const strNoteDate = String(response.notes[i].eventDate);
  
            if (strDate == strNoteDate) {
              console.log("ok ", response.notes[i]);
              notesdata.push(response.notes[i]);
            } else {
              console.log("no notes found");
            }
          }
          if (notesdata.length == 0) {
            res.send();
          } else {
            console.log(notesdata);
            res.send(notesdata);
          }
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: err.message });
        });
    },
  
    createNotes: async (req, res) => {
      let user = req.headers["userid"];
      const { eventDate, mood, symptoms, flow } = req.body;
      const check = await Cycle.findOne({
        user,
      });
  
      if (check) {
        await Cycle.findOneAndUpdate(
          { user },
          {
            $push: {
              notes: {
                eventDate: eventDate,
                mood: mood,
                symptoms: symptoms,
                flow: flow,
              },
            },
          }
        )
          .then(() => {
            return res.json({ msg: "saved" });
          })
          .catch((err) => {
            return res.status(500).json({ msg: err.message });
          });
      } else {
        return res.status(400).json({ msg: "provide the initial data first" });
      }
    },
}  

module.exports = notesCycleTrackerControllers;