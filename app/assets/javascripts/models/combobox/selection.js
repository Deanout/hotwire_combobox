import Combobox from "models/combobox/base"
import { wrapAroundAccess } from "helpers"

Combobox.Selection = Base => class extends Base {
  selectOption(event) {
    this._select(event.currentTarget)
    this.close()
  }

  _connectSelection() {
    if (this.hiddenFieldTarget.value) {
      this._selectOptionByValue(this.hiddenFieldTarget.value)
    }
  }

  _select(option, { force = false } = {}) {
    this._resetOptions()

    if (option) {
      if (this.hasSelectedClass) option.classList.add(this.selectedClass)

      this._markValid()
      this._maybeAutocompleteWith(option, { force })
      this._commitSelection(option, { selected: true })
    } else {
      this._markInvalid()
    }
  }

  _commitSelection(option, { selected }) {
    option?.setAttribute("aria-selected", selected)
    option?.scrollIntoView({ block: "nearest" })

    if (selected) {
      this.hiddenFieldTarget.value = option?.dataset.value
    } else {
      this.hiddenFieldTarget.value = null
    }
  }

  _deselect() {
    const option = this._selectedOptionElement

    if (this.hasSelectedClass) option?.classList.remove(this.selectedClass)
    this._commitSelection(option, { selected: false })
  }

  _selectNew(query) {
    this._resetOptions()
    this.hiddenFieldTarget.value = query
    this.hiddenFieldTarget.name = this.nameWhenNewValue
  }

  _selectIndex(index) {
    const option = wrapAroundAccess(this._visibleOptionElements, index)
    this._select(option, { force: true })
  }

  _selectOptionByValue(value) {
    this._allOptions.find(option => option.dataset.value === value)?.click()
  }
}