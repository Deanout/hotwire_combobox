import Combobox from "models/combobox"
import { Concerns } from "helpers"
import { Controller } from "@hotwired/stimulus"

const concerns = [
  Controller,
  Combobox.Actors,
  Combobox.AsyncLoading,
  Combobox.Autocomplete,
  Combobox.Dialog,
  Combobox.Filtering,
  Combobox.Navigation,
  Combobox.Options,
  Combobox.Selection,
  Combobox.Toggle,
  Combobox.Validity
]

export default class HwComboboxController extends Concerns(...concerns) {
  static classes = [
    "invalid",
    "selected"
  ]

  static targets = [
    "combobox",
    "dialog",
    "dialogCombobox",
    "dialogFocusTrap",
    "dialogListbox",
    "handle",
    "hiddenField",
    "listbox",
    "paginationFrame"
  ]

  static values = {
    asyncSrc: String,
    autocompletableAttribute: String,
    autocomplete: String,
    expanded: Boolean,
    filterableAttribute: String,
    nameWhenNew: String,
    originalName: String,
    prefilledDisplay: String,
    smallViewportMaxWidth: String
  }

  initialize() {
    this._initializeActors()
    this._initializeFiltering()
  }

  connect() {
    this._connectSelection()
    this._connectListAutocomplete()
    this._connectDialog()
  }

  disconnect() {
    this._disconnectDialog()
  }

  expandedValueChanged() {
    if (this.expandedValue) {
      this._expand()
    } else {
      this._collapse()
    }
  }

  paginationFrameTargetConnected() {
    this._preselectOption()
  }
}
