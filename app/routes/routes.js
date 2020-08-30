const express = require('express');
const router = express.Router();

const Bookmark = require('../models/bookmarkModel.js'); // Bringing in the bookmark model

// Create and Save a new bookmark

router.post('/', (req, res) => {
  var query = req.body.Link; // Validate unique Bookmarks
  Bookmark.findOne({ Link: query }, (err, example) => {
    if (err) console.log(err);
    if (example) {
      console.log('This Bookmark already exists');
      res.send('Bookmark Already Exists');
    } else {
      // Create a bookmark
      const bookmark = new Bookmark({
        Link: req.body.Link,
        Title: req.body.Title,
        Publisher: req.body.Publisher,
        Tags: {
          Title: req.body.Tags.Title,
        },
      });

      // Save bookmark in the database
      bookmark
        .save()
        .then((data) => {
          res.send(data);
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the bookmark.',
          });
        });
    }
  });
});

// Retrieve and return all bookmark from the database.

router.get('/', (req, res) => {
  Bookmark.find()
    .then((bookmarks) => {
      res.send(bookmarks);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving bookmark.',
      });
    });
});

// Find a single bookmark with an id

router.get('/:bookmarkID', (req, res) => {
  Bookmark.findById(req.params.bookmarkID)
    .then((bookmark) => {
      if (!bookmark) {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      res.send(bookmark); // Response Send
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving bookmark with id ' + req.params.bookmarkID,
      });
    });
});

// Find bookmark and update it with the request body

router.put('/:bookmarkID', (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.bookmarkID, {
    Link: req.body.Link,
    Title: req.body.Title,
    Publisher: req.body.Publisher,
  })
    .then((bookmark) => {
      if (!bookmark) {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      res.send(bookmark);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Error updating note with id ' + req.params.bookmarkID,
      });
    });
});

// Delete a bookmark with the specified bookmarkID in the request

router.delete('/:bookmarkID', (req, res) => {
  Bookmark.findByIdAndRemove(req.params.bookmarkID)
    .then((bookmark) => {
      if (!bookmark) {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      res.send({ message: 'bookmark deleted successfully!' });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Could not delete bookmark with id ' + req.params.bookmarkID,
      });
    });
});

// Get all tags from the database and output it

router.get('/each/tags', (req, res) => {
  Bookmark.find()
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => {
        bookmark.Tags.forEach((tag) => {
          console.log(tag.Title);
        });
      });
      res.send(bookmarks);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving bookmark.',
      });
    });
});

// Find a bookmark with ID and get its Tags

router.get('/:bookmarkID/get-tag', (req, res) => {
  Bookmark.findById(req.params.bookmarkID)
    .then((bookmark) => {
      if (!bookmark) {
        return res.status(404).send({
          message:
            'Tag not found with this bookmark id ' + req.params.bookmarkID,
        });
      } else {
        res.send(bookmark.Tags);
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving bookmark with id ' + req.params.bookmarkID,
      });
    });
});

// Find a bookmark with id and add more tags

router.put('/:bookmarkID/add-tag', (req, res) => {
  const tag = {
    Title: req.body.Title,
  };
  Bookmark.findByIdAndUpdate(req.params.bookmarkID, {
    TimeUpdated: Math.floor(Date.now() / 1000),
    $push: { Tags: tag },
  })
    .then((bookmark) => {
      res.send('Tag added');
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving bookmark with id ' + req.params.bookmarkID,
      });
    });
});

// Find a bookmark with id and delete a tag by its name(delete-tag)

router.put('/:bookmarkID/:deletetag', (req, res) => {
  Bookmark.findByIdAndUpdate(req.params.bookmarkID, {
    $pull: { Tags: [req.params.deletetag] },
  })
    .then((bookmark) => {
      console.log(bookmark);
      res.send('Tag added');
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'bookmark not found with id ' + req.params.bookmarkID,
        });
      }
      return res.status(500).send({
        message: 'Error retrieving bookmark with id ' + req.params.bookmarkID,
      });
    });
});

module.exports = router;
